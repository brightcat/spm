package za.co.brightcat.pm.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
public class Objective implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String description;

    @ManyToOne
    private Project project;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    public Objective() {
    }

    public Objective(Project project, String description) {
        this.project = project;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    @PrePersist
    public void setDateCreated() {
        this.dateCreated = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Objective objective = (Objective) o;
        return Objects.equals(id, objective.id) &&
                Objects.equals(dateCreated, objective.dateCreated)
                && Objects.equals(project, objective.project);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, project, dateCreated);
    }

    @Override
    public String toString() {
        return "Objective{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", dateCreated=" + dateCreated +
                '}';
    }
}
