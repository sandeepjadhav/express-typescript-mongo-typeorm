import { IsEmail, IsInt, Max, Min } from "class-validator";
import { Entity,  Column, CreateDateColumn, PrimaryGeneratedColumn, ObjectIdColumn, ObjectId } from "typeorm"

@Entity()
export class User {

  @ObjectIdColumn()
  id: ObjectId

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  @IsEmail()
  email: string;
  
  @Column()
  @IsInt()
  @Min(0)
  @Max(50)
  age: number

  @Column()
  isDeleted: boolean

  @CreateDateColumn()
  createdDate: Date;
}
