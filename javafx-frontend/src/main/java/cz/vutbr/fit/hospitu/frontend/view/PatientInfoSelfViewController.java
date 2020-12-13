package cz.vutbr.fit.hospitu.frontend.view;

import cz.vutbr.fit.hospitu.frontend.api.APIErrorException;
import cz.vutbr.fit.hospitu.frontend.api.APIManager;
import cz.vutbr.fit.hospitu.frontend.api.response.PatientInfoResponseData;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.text.Text;
import javafx.scene.text.TextFlow;

public class PatientInfoSelfViewController extends ViewController
{
    @FXML
    private TextFlow alergiesField;

    @FXML
    private TextFlow conditionsField;

    @FXML
    private TextFlow genderField;

    @FXML
    private TextFlow practitionerField;

    private Text allergiesText;
    private Text conditionsText;
    private Text genderText;
    private Text practitionerText;

    @FXML
    public void initialize()
    {
        this.allergiesText = new Text();
        this.allergiesText.setText("Načítání...");
        this.alergiesField.getChildren().addAll(this.allergiesText);

        this.conditionsText = new Text();
        this.conditionsText.setText("Načítání...");
        this.conditionsField.getChildren().addAll(this.conditionsText);

        this.genderText = new Text();
        this.genderText.setText("Načítání...");
        this.genderField.getChildren().addAll(this.genderText);

        this.practitionerText = new Text();
        this.practitionerText.setText("Načítání...");
        this.practitionerField.getChildren().addAll(this.practitionerText);

        var downloadThread = new Thread(() -> {
            try
            {
                var result = APIManager.instance().get("/users/@self/patient-info", this.loginData.get().getToken(), PatientInfoResponseData.class);

                Platform.runLater(() -> {
                    this.allergiesText.setText(result.getAllergies());
                    this.conditionsText.setText(result.getConditions());
                    this.genderText.setText(result.getGender());
                    this.practitionerText.setText(result.getPractitioner());
                });
            }
            catch (APIErrorException e)
            {
                Platform.runLater(() -> {
                    this.allergiesText.setText(e.getMessage());
                    this.conditionsText.setText(e.getMessage());
                    this.genderText.setText(e.getMessage());
                    this.practitionerText.setText(e.getMessage());
                });
            }
        });
        downloadThread.start();
    }
}
