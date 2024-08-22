package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Metric;
import com.houstonlewis.PrintBillMaster.models.Printer;

import java.util.List;

public interface PrinterDAO {

    List<Metric> getMetrics(String id);

    List<Printer> getPrinters(String id);

    boolean addPrinter(Printer printer);

    boolean updatePrinter(Printer printer);

}
