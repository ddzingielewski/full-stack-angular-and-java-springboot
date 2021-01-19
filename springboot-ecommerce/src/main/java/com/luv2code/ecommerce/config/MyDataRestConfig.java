package com.luv2code.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
	
	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		this.entityManager = theEntityManager;
	}

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        // disable HTTP methods: PUT, POST, DELETE and PATCH
        disableHttpMethod(Product.class, config, theUnsupportedActions);
        disableHttpMethod(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethod(Country.class, config, theUnsupportedActions);
        disableHttpMethod(State.class, config, theUnsupportedActions);
        
        exposeIds(config);
    }

	private void disableHttpMethod(Class<?> theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		List<Class> entityClasses = new ArrayList<>();
		for (EntityType tempEntity: entities) {
			entityClasses.add(tempEntity.getJavaType());
		}
		
		Class [] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);		
	}
    
}