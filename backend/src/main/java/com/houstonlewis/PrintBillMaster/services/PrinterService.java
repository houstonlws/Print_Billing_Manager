package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.PrinterDAO;
import com.houstonlewis.PrintBillMaster.models.Printer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrinterService {

    private final PrinterDAO printerDAO;

    public PrinterService(PrinterDAO printerDAO) {
        this.printerDAO = printerDAO;
    }

    public List<Printer> getPrinters(String id) {
        return printerDAO.getPrinters(id);
    }

    public boolean updatePrinter(Printer printer) {
        return printerDAO.updatePrinter(printer);
    }

    public boolean addPrinter(Printer printer) {
        return printerDAO.addPrinter(printer);
    }
}
