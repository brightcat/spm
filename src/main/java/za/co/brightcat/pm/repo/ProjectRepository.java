package za.co.brightcat.pm.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.brightcat.pm.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
