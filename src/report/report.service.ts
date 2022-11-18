import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { ReportDTO } from './dto/report.dto';
import { Report, ReportDocument } from './schemas/report.schema';

@Injectable()
export class ReportService {
    ReportModel: any;
    constructor(
        @InjectModel(Report.name) private reportModel: Model<ReportDocument>
    ) {}

    async create(report: ReportDTO): Promise<Report> {
        const date = `${new Date().toLocaleDateString() + " " +new Date().toLocaleTimeString()}`
        report['date'] = date;

        const createdReport = new this.reportModel(report);
        if (createdReport) {
            report['report_id'] = createdReport._id;
            axios.post('https://5000-mojonapower-microservic-oullafk9vib.ws-us76.gitpod.io/sms', report)
        }
        return createdReport.save();
    }

    async findAll(): Promise<Report[]> {
        return this.reportModel.find().exec();
    }
}
