import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop()
  id: string;

  @Prop()
  tipo: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  geolocalization: string;

  @Prop()
  date: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);