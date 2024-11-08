import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    user_id: number
    @Column()
    token:string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}