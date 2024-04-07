import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { PhishingStatus } from '../enum/phishing-status.enum';

@Schema({ timestamps: true })
export class PhishingLogs extends Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  version: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  from: mongoose.Types.ObjectId;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: false })
  template: string;

  @Prop({ default: PhishingStatus.PENDING })
  status: PhishingStatus;

  @Prop({ required: true })
  generatedHash: string;
}

export const PhishingLogsSchema = SchemaFactory.createForClass(PhishingLogs);
