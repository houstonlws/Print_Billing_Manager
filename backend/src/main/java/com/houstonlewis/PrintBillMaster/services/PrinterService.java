package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.PrinterDAO;
import com.houstonlewis.PrintBillMaster.models.Printer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrinterService {

    @Autowired
    private PrinterDAO printerDAO;

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
