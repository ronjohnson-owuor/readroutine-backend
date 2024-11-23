import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Userdetails {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    user_id: number
    @Column()
    nickname: string
    @Column()
    tier: number
    @Column()
    expiry_date: string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date;
}