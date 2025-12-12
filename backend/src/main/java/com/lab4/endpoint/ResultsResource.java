package com.lab4.endpoint;


import java.util.List;

import com.lab4.auth.Secured;
import com.lab4.bean.ResultService;
import com.lab4.dto.PointRequest;
import com.lab4.entity.ResultEntity;
import com.lab4.model.AreaHitChecker;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/points")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ResultsResource {

    @Inject // А это как работает вообще, это что, CDI бин?
    private ResultService resultService;


    @POST
    @Path("/add-new")
    @Secured
    public Response newPoint(PointRequest request) {

        String error = AreaHitChecker.validateParameters(request);
        
        if (error != null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(error)
                           .build();
        }

        resultService.addResultBasedOnRequest(request);

        return Response.status(Response.Status.CREATED).build();
    }


    @GET
    @Path("/get-all")
    @Secured
    public Response getResults() {
        List<ResultEntity> results = resultService.getAllResults();

        return Response.ok(results).build();
    }

    @DELETE
    @Path("/clear-all") // Чекнуть именование эндпоинтов
    @Secured
    public Response clearAll() {
        resultService.clearAll();

        return Response.noContent().build();
    }



}

