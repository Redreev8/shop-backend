import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 128 })
    name: string;

    @Column('varchar', { name: 'first_name', length: 128 })
    firstName: string;

    @Column('int')
    age: number;

    @Column('varchar', { length: 1 })
    boden: 'm' | 'w';

    @Column()
    probleme: boolean;
}