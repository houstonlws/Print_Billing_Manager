package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.printer.Metric;
import com.houstonlewis.PrintBillMaster.models.printer.Printer;

import java.util.List;

public interface PrinterDAO {

    List<Metric> getMetrics(String id);
    List<Printer> getPrinters(String id);
    boolean addPrinter(Printer printer);
    boolean updatePrinter(Printer printer);

}
