import { RequestHandler } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User";
import { ObjectId as ObjectIDType } from 'mongodb'
import { ObjectId } from 'mongodb';

const userRepository = AppDataSource.getRepository(User)

//Get All Users
export const getUsers: RequestHandler = async (req, res) => {
  const skip: number = parseInt(`${req.query.page}`) || parseInt('0');
  const take: number = parseInt(`${req.query.pageSize}`) || 10;

  const [users, userCount] = await userRepository.findAndCount({
    take: take, skip: skip,
    order: {
      'id': "DESC"
    }
  })
  const totalPages = Math.ceil(userCount / take);
  const prevPage = skip - 1 < 1 ? null : skip - 1;
  const nextPage = skip + 1 > totalPages ? null : skip + 1;
  res.send({
    users,
    totalRecords: userCount,
    currentPage: skip,
    totalPages: totalPages,
    prevPage: prevPage,
    nextPage: nextPage,
    lastPage: totalPages
  });
}
export const toObjectId = (value: string | ObjectIDType): ObjectIDType => {
  return typeof value === 'string' ? new ObjectIDType(value) : value
}
// Save users
export const saveUser: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    const results = await userRepository.save(req.body);
    console.log('results', results)
    return res.send(results)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

// Get user details by userId
export const getUserById: RequestHandler = async (req, res) => {
  try {
    const user = await userRepository.findOneBy({
      _id: toObjectId(`${req.params.userId}`)
    } as any);

    return res.json(user);
    
  } catch (error) {
    return res.status(500).send(error);
  }
}

// Update user by userID
export const updateUserById: RequestHandler = async (req, res) => {
  const user = await userRepository.findOneBy({
    _id: toObjectId(`${req.params.userId}`)
  } as any);

  const {firstName, lastName,email, age} = req.body;
  if(firstName) user.firstName = firstName;
  if(lastName) user.lastName = lastName;
  if(email) user.email = email;
  if(age) user.age = age;
  const results = await userRepository.save(user);
  console.log('results', results);
  res.json(results);
}

// Soft Delte user by UserID
export const deleteUserById: RequestHandler = async (req, res) => {
  const user = await userRepository.findOneBy({
    _id: toObjectId(`${req.params.userId}`)
  } as any);
  user.isDeleted = true;
  const results = await userRepository.save(user);
  console.log('results', results);
  res.json(results);
}
