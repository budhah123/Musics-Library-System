import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  FullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  

}
