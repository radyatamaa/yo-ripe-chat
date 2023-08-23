import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 191, name: "name" })
    name: string;

    @Column({ length: 191, name: "email" })
    email: string;

    @Column({ length: 191, name: "password" })
    password: string;

    @Column({ length: 191, name: "socket_id" ,nullable: true})
    socketId: string;

    @Column({ length: 1, name: "online" })
    online: string;

    @Column({ length: 100, name: "remember_token" })
    rememberToken: string;

    @Column({ name: "created_at" , type:'timestamp' })
    createdAt: string;

    @Column({ name: "updated_at" , type:'timestamp' })
    updatedAt: string;
}
  