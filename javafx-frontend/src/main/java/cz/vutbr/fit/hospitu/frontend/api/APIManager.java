package cz.vutbr.fit.hospitu.frontend.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.SerializedName;
import cz.vutbr.fit.hospitu.frontend.api.response.AbstractResponseData;
import cz.vutbr.fit.hospitu.frontend.api.response.HumanReadableResponseData;
import javafx.scene.control.Alert;
import okhttp3.*;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Objects;

public class APIManager
{
    private APIConfig config;
    private OkHttpClient client;
    private Gson gson;

    private static APIManager instance;

    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    private APIManager()
    {

    }

    public static APIManager instance()
    {
        if (instance == null)
        {
            try (var br = new InputStreamReader(APIManager.class.getResourceAsStream("/config/api_config.json")))
            {
                instance = new APIManager();
                instance.gson = new GsonBuilder().serializeNulls().create();
                instance.config = instance.gson.fromJson(br, APIConfig.class);
                instance.client = new OkHttpClient();

                System.out.println("API configuration loaded.");
            }
            catch (IOException e)
            {
                var alert = new Alert(Alert.AlertType.ERROR);
                alert.setTitle("Chyba");
                alert.setHeaderText("Došlo k chybě při čtení konfigurace aplikace. \nProsím kontaktujte správce.");
                alert.showAndWait();

                throw new RuntimeException(e);
            }
        }

        return instance;
    }

    private <R extends AbstractResponseData> R apiCall(Request request, Class<R> expectedResponseType)
    {
        try (Response response = this.client.newCall(request).execute())
        {
            var responseBody = Objects.requireNonNull(response.body());
            var responseCode = response.code();

            if (response.isSuccessful())
            {
                var responseStr = responseBody.string();
                return this.gson.fromJson(responseStr, expectedResponseType);
            }
            else if ( responseCode >= 400 && responseCode <= 405)
            {
                var responseStr = responseBody.string();
                throw new APIErrorException(this.gson.fromJson(responseStr, HumanReadableResponseData.class));
            }
            else if (responseCode == 500)
            {
                throw new APIErrorException(new HumanReadableResponseData(500, "Internal server error.",
                    "Při zpracování požadavku serverem došlo k chybě, prosím zkuste to znovu později."));
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        throw new APIErrorException();
    }

    public <B, R extends AbstractResponseData> R post(String url, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .post(body)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <B, R extends AbstractResponseData> R post(String url, String authorization, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .post(body)
            .header("Authorization", "Bearer " + authorization)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <B, R extends AbstractResponseData> R put(String url, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .put(body)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <B, R extends AbstractResponseData> R put(String url, String authorization, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .put(body)
            .header("Authorization", "Bearer " + authorization)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <B, R extends AbstractResponseData> R patch(String url, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .patch(body)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <B, R extends AbstractResponseData> R patch(String url, String authorization, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .patch(body)
            .header("Authorization", "Bearer " + authorization)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <B, R extends AbstractResponseData> R delete(String url, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .delete(body)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <B, R extends AbstractResponseData> R delete(String url, String authorization, Class<R> expectedResponseType, B data)
    {
        var dataStr = this.gson.toJson(data);

        var body = RequestBody.create(dataStr, JSON);

        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .delete(body)
            .header("Authorization", "Bearer " + authorization)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <R extends AbstractResponseData> R delete(String url, Class<R> expectedResponseType)
    {
        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .delete()
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <R extends AbstractResponseData> R delete(String url, String authorization, Class<R> expectedResponseType)
    {
        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .delete()
            .header("Authorization", "Bearer " + authorization)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <R extends AbstractResponseData> R get(String url, Class<R> expectedResponseType)
    {
        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .get()
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public <R extends AbstractResponseData> R get(String url, String authorization, Class<R> expectedResponseType)
    {
        Request request = new Request.Builder()
            .url(this.config.baseURI + url)
            .get()
            .header("Authorization", "Bearer " + authorization)
            .build();

        return this.apiCall(request, expectedResponseType);
    }

    public static class APIConfig
    {
        @SerializedName("base_uri")
        private String baseURI;

        public String getBaseURI()
        {
            return this.baseURI;
        }
    }
}
