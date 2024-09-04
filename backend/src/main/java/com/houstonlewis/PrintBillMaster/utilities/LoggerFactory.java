package com.houstonlewis.PrintBillMaster.utilities;

import java.io.OutputStream;
import java.util.logging.Formatter;
import java.util.logging.LogRecord;
import java.util.logging.Logger;
import java.util.logging.StreamHandler;

public class LoggerFactory {

    public static Logger getLogger(Class<?> clazz) {
        Logger logger = Logger.getLogger(clazz.getName());

        CustomConsoleHandler ch = new CustomConsoleHandler(System.out, new LogFormatter());
        logger.addHandler(ch);

        Logger rootLogger = Logger.getLogger("");
        for (var handler : rootLogger.getHandlers()) {
            rootLogger.removeHandler(handler);
        }

        return logger;
    }

    private static class LogFormatter extends Formatter {

        @Override
        public String format(LogRecord record) {
            String[] classParts = record.getSourceClassName().split("\\.");
            String color;
            switch (record.getLevel().getName()) {
                case "SEVERE":
                    color = "\u001B[31m";
                    break;
                case "WARNING":
                    color = "\u001B[33m";
                    break;
                default:
                    color = "\u001B[0m";
            }
            return String.format("%1$s[%2$tF %2$tT] [%3$s] [%4$s::%5$s] %6$s %n",
                    color,
                    record.getMillis(),
                    record.getLevel().getName(),
                    classParts[classParts.length - 1],
                    record.getSourceMethodName(),
                    record.getMessage());
        }
    }

    private static class CustomConsoleHandler extends StreamHandler {

        public CustomConsoleHandler(OutputStream out, Formatter formatter) {
            super(out, formatter);
        }

        @Override
        public synchronized void publish(LogRecord record) {
            super.publish(record);
            flush();
        }
    }

}
