import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({name: "urban_data"})
export class UrbanDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  lat: string;

  @Column({default: null})
  lng: string;

  @Column({ unique: true, default: null })
  package_id: string;

  @Column({ default: null })
  location_name: string;

  @Column({ default: null })
  extra_1: string;

  @Column({ default: null })
  extra_2: string;
}