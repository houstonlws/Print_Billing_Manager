package com.houstonlewis.PrintBillMaster.utilities;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import java.io.OutputStream;
import java.io.PrintStream;

@Aspect
@Component
public class LoggingAspect {

    private static final ThreadLocal<Boolean> prefixAdded = ThreadLocal.withInitial(() -> false);

    @Autowired
    private HttpServletRequest request;

    @RequestScope
    @Around("execution(public * com.houstonlewis.PrintBillMaster.controllers..*(..))")
    public Object prefixLogs(ProceedingJoinPoint jp) throws Throwable {

        if (prefixAdded.get()) return jp.proceed();

        PrintStream originalOut = System.out;
        PrintStream prefixOut = new PrintStream(new OutputStream() {

            @Override
            public void write(int b) {

            }

            @Override
            public void write(byte[] b, int off, int len) {

                String requestPath = request.getRequestURI();
                String method = request.getMethod();

                String prefix = String.format("[%s:%s] ", method, requestPath);
                String output = new String(b, off, len);
                if (!output.trim().isEmpty()) {
                    originalOut.print(prefix + output);
                } else originalOut.write(b, off, len);
            }
        });

        prefixAdded.set(true);
        System.setOut(prefixOut);
        try {
            return jp.proceed();
        } finally {
            System.setOut(originalOut);
            prefixAdded.remove();
        }
    }
}
