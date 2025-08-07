import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  FullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  

}
