import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings.js';

@Entity()
export class Music {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  genre: string;

  @Column({ default: 'https://example.com/default-music-url' })
  url: string;

  @Column({ default: 'https://example.com/default-thumbnail-url.jpg' })
  thumbnail: string; 

  @Column({ type: 'timestamp', default: () => 'Current_Timestamp' })
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}
