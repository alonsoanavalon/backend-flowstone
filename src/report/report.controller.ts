import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportDTO } from './dto/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(
        private readonly reportService: ReportService
    ) {}

    @Post('')
    async createReport(
        @Body() report: ReportDTO
    ){
        console.log("Report/POST")
        return this.reportService.create(report);
    }

    @Get('')
    async getAllReports () {
        console.log("Report/GET")
        return this.reportService.findAll()
    }
}
