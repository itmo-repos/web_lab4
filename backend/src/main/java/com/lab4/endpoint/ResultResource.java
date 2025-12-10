package com.lab4.endpoint;

import com.lab4.auth.Secured;
import com.lab4.bean.ResultService;
import com.lab4.entity.ResultEntity;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import java.util.stream.Collectors;

@Path("/results")
public class ResultResource {

    @Inject
    private ResultService resultService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public List<String> getResults() {

        List<ResultEntity> results = resultService.getAllResults();

        return results.stream()
                      .map(result -> result.toString())
                      .collect(Collectors.toList());
    }
}
