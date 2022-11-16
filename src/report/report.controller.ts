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
        return this.reportService.create(report);
    }

    @Get('')
    async getAllReports () {
        return this.reportService.findAll()
    }
}
