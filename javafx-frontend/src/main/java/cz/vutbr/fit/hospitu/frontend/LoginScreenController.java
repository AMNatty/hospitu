package cz.vutbr.fit.hospitu.frontend;

import cz.vutbr.fit.hospitu.frontend.api.APIErrorException;
import cz.vutbr.fit.hospitu.frontend.api.APIManager;
import cz.vutbr.fit.hospitu.frontend.api.EnumAPIRole;
import cz.vutbr.fit.hospitu.frontend.api.request.LoginRequestData;
import cz.vutbr.fit.hospitu.frontend.api.response.LoginResponseData;
import cz.vutbr.fit.hospitu.frontend.data.LoginData;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;

import java.io.IOException;

public class LoginScreenController
{
    @FXML
    private AnchorPane container;

    @FXML
    private TextField loginField;

    @FXML
    private PasswordField passwordField;

    @FXML
    public void initialize()
    {
    }

    @FXML
    public void loginClick(ActionEvent event) throws IOException
    {
        var scene = this.container.getScene();
        var loader = AppMain.createFXMLLoader("AppBase");

        try
        {
            LoginResponseData loginResponseData = APIManager.instance().post("/users/login", LoginResponseData.class, new LoginRequestData(loginField.getText(), passwordField.getText()));

            var loginData = new LoginData(
                loginResponseData.getID(),
                loginResponseData.getLogin(),
                loginResponseData.getName(),
                loginResponseData.getSurname(),
                loginResponseData.getRole(),
                loginResponseData.getToken());

            scene.setRoot(loader.load());
            AppBaseController controller = loader.getController();
            controller.setLoginData(loginData);
        }
        catch (APIErrorException e)
        {
            var alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Chyba");
            alert.setHeaderText(e.getMessage());
            alert.showAndWait();
        }
    }
}
