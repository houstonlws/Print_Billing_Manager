package com.houstonlewis.PrintBillMaster.utilities;

import java.io.OutputStream;
import java.util.logging.*;

public class LoggerFactory {

    public static Logger getLogger(Class<?> clazz) {
        Logger logger = Logger.getLogger(clazz.getName());

        CustomConsoleHandler ch = new CustomConsoleHandler(System.out, new LogFormatter());
        ch.setLevel(Level.FINE);
        logger.addHandler(ch);
        logger.setLevel(Level.FINE);

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
                case "FINE":
                    color = "\u001b[34m";
                    break;
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
