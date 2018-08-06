package za.co.brightcat.pm;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import za.co.brightcat.pm.entity.Project;
import za.co.brightcat.pm.repo.ProjectRepository;

@SpringBootApplication
public class PmApp {
    private static final Logger LOGGER = LoggerFactory.getLogger(PmApp.class);

    public static void main(String[] args) {
        SpringApplication.run(PmApp.class, args);
    }

    @Autowired
    private ProjectRepository pr;
    
    @Bean
    public Filter filter() {
        return new Filter() {
            @Override
            public void init(FilterConfig fc) throws ServletException {
                
            }

            @Override
            public void doFilter(ServletRequest sreq, ServletResponse resp, FilterChain fc) throws IOException, ServletException {
                final HttpServletRequest req = (HttpServletRequest) sreq;
                final String path = req.getServletPath();
                LOGGER.debug("Path info: {}", path);
                if (path.endsWith(".html") || path.endsWith(".js")) {
                    fc.doFilter(req, resp);
                    return;
                }
                final String token = req.getHeader("auth-token");
                LOGGER.info("Auth token is: {}", token);

                if (token == null) {
                    final HttpServletResponse hr = (HttpServletResponse)resp;
                    LOGGER.warn("Unauthorized access to {} from {}", req.getRequestURI(),req.getRemoteHost());
                    hr.sendError(HttpServletResponse.SC_FORBIDDEN);
                    return;
                }
                fc.doFilter(sreq, resp);
            }

            @Override
            public void destroy() {
                
            }
        };
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            LOGGER.debug("Start");

            final Project p1 = pr.save(new Project("Project 1"));
            LOGGER.debug("Created {}", p1);
            final Project p2 = pr.save(new Project("Project 2"));
            LOGGER.debug("Created {}", p2);
            final Project p3 = pr.save(new Project("Project 3"));
            LOGGER.debug("Created {}", p3);

            LOGGER.debug("Stop");
        };
    }
}
