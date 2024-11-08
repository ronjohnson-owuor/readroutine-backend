import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @PrimaryGeneratedColumn('uuid')
    uuid: string
    @Column()
    username: string
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    email_verified:boolean
    @Column({nullable:true})
    profile_url:string
    @Column ()
    type:string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}