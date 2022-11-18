import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportDTO } from './dto/report.dto';
import { Report, ReportDocument } from './schemas/report.schema';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';


@Injectable()
export class ReportService {
    ReportModel: any;
    constructor(
        @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
        private readonly httpService: HttpService
    ) {}

    async create(report: ReportDTO): Promise<Report> {
        const date = `${new Date().toLocaleDateString() + " " +new Date().toLocaleTimeString()}`
        report['date'] = date;

        const createdReport = new this.reportModel(report);
        if (createdReport) {
            report['report_id'] = createdReport._id;
            report['phone'] = "+56940340950";


            try {
                const reportToArduino:Observable<AxiosResponse<any[]>> = await this.httpService.axiosRef.post('https://5000-mojonapower-microservic-oullafk9vib.ws-us76.gitpod.io/sms', report, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            } catch (err) {
                console.log(err)
            }

        return createdReport.save();
        }
    }

    async findAll(): Promise<Report[]> {
        return this.reportModel.find().exec();
    }
}
