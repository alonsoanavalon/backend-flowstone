import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop()
  id: string;

  @Prop()
  operador: string;

  @Prop()
  message: string;

  @Prop()
  action: string;

  @Prop()
  picture: string;


}

export const ReportSchema = SchemaFactory.createForClass(Report);