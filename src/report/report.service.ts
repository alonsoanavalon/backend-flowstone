import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportDTO } from './dto/report.dto';
import { Report, ReportDocument } from './schemas/report.schema';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
 var XMLHttpRequest = require('xhr2');
 import FormData = require('form-data')


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
  
            report['phone'] = "+56940340950";
            report['tipo'] = "WARN";
            report['id'] = "18.222.135-5";
            report['description'] = "Se identifica una calidad en el material no esperada";
            report['geolocalization'] = "lat: 112.256, lng: 451.335";

        const createdReport = new this.reportModel(report);
        if (createdReport) {
            report['report_id'] = createdReport._id;
            // const base64: any = report.image;
            // const image = new Buffer(base64, 'base64');
            // report.image = image;

            try {
                const reportToArduino:Observable<AxiosResponse<any[]>> = await this.httpService.axiosRef.post('https://5000-mojonapower-microservic-oullafk9vib.ws-us74.gitpod.io/sms', report, {
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
        const reports = await this.reportModel.find().exec();
        // const parsedReports = reports.map((report) => {
        //     const parsedReport = JSON.parse(JSON.stringify(report));
        //     parsedReport.image = Buffer.from(parsedReport.image).toString('base64');
        //     return parsedReport;
        // })

        return reports;
    }
}
