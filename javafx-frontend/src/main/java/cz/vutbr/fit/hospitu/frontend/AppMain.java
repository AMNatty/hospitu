package cz.vutbr.fit.hospitu.frontend;

import cz.vutbr.fit.hospitu.frontend.api.APIManager;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.Locale;

public class AppMain extends Application
{

    public static void main(String[] args)
    {
        Locale.setDefault(Locale.forLanguageTag("cs-CZ"));

        launch(args);
    }

    @Override
    public void start(Stage primaryStage)
    {
        try
        {
            APIManager.instance();

            var baseAppPane = (AnchorPane) loadFXML("LoginScreen");
            var scene = new Scene(baseAppPane, 1280, 700);
            primaryStage.setMinHeight(600);
            primaryStage.setMinWidth(800);
            primaryStage.setTitle("HospITU desktop app");
            primaryStage.setScene(scene);
            primaryStage.show();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public static <T> T loadFXML(String fxml) throws IOException
    {
        var resource = AppMain.class.getResource(fxml + ".fxml");
        return FXMLLoader.load(resource);
    }

    public static FXMLLoader createFXMLLoader(String fxml)
    {
        var resource = AppMain.class.getResource(fxml + ".fxml");
        return new FXMLLoader(resource);
    }
}
