package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Printer;

import java.util.List;

public interface PrinterDAO {

    List<Printer> getPrinters(String id);

    boolean addPrinter(Printer printer);

    boolean updatePrinter(Printer printer);

}
