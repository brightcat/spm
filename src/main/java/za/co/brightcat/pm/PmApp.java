package za.co.brightcat.pm;

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
