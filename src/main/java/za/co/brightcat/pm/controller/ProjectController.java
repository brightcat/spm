package za.co.brightcat.pm.controller;

import java.util.AbstractMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.co.brightcat.pm.entity.Project;
import za.co.brightcat.pm.repo.ProjectRepository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("project")
public class ProjectController {
    private static Map<String, Integer> map = of(pair("Test", 1), pair("More", 2), pair("Rich", 33));
    
    private static <K,V> Map.Entry<K,V> pair(K k, V v) {
        return new AbstractMap.SimpleEntry<>(k, v);
    };
    
    private static <K,V> Map<K,V> of(Map.Entry<K, V>... e) {
        HashMap<K, V> map= new HashMap<>(e.length);
        for (Map.Entry<K, V> entry : e) {
            map.put(entry.getKey(), entry.getValue());
        }
        
        return map;
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectController.class);
    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping
    public Project create(Project project) {
        LOGGER.debug("Create project {}", project);
        return projectRepository.save(project);
    }

    @GetMapping("{id}")
    public Project get(@PathVariable Long id) {
        LOGGER.debug("Fetch project {}", id);
        final Project project = projectRepository.getOne(id);
        LOGGER.debug("Repo return project {}", project);
        return project;
    }

    @GetMapping
    public Collection<Project> list() {
        LOGGER.debug("List all projects {}", map);
        return projectRepository.findAll();
    }
    
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        final Optional<Project> result = projectRepository.findById(id);
        if (result.isPresent()) {
            final Project project = result.get();
            projectRepository.delete(project);
            LOGGER.debug("Project deleted {}", project);
        }
        
    }
}
