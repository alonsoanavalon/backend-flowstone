import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
        // if createdReport es true, enviamos a la api de la maca
        return createdReport.save();
    }

    async findAll(): Promise<Report[]> {
        return this.reportModel.find().exec();
    }
}
