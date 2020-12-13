package cz.vutbr.fit.hospitu.frontend;

import cz.vutbr.fit.hospitu.frontend.api.EnumAPIRole;
import cz.vutbr.fit.hospitu.frontend.data.LoginData;
import cz.vutbr.fit.hospitu.frontend.view.ViewController;
import javafx.animation.Animation;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.beans.binding.Bindings;
import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.util.Duration;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

public class AppBaseController
{
    private ObjectProperty<LoginData> loginData;

    @FXML
    private AnchorPane container;

    @FXML
    private Button profile;

    @FXML
    private Label nameLabel;

    @FXML
    private Label roleLabel;

    @FXML
    private Label dateLabel;

    @FXML
    private Label timeLabel;

    @FXML
    private ScrollPane viewPane;

    private StringProperty timeProperty;

    private StringProperty dateProperty;

    private Timeline timeUpdater;


    @FXML
    public void initialize() throws IOException
    {
        this.timeProperty = new SimpleStringProperty();
        this.dateProperty = new SimpleStringProperty();

        this.loginData = new SimpleObjectProperty<>();

        var nameBinding = Bindings.selectString(this.loginData, "name");
        var surnameBinding = Bindings.selectString(this.loginData, "surname");

        var nameSurname = Bindings.format("%s %s", nameBinding, surnameBinding);

        this.profile.textProperty().bind(nameSurname);

        var roleBinding =  Bindings.<EnumAPIRole>select(this.loginData, "role");
        var readableRoleBinding = Bindings.createStringBinding(() -> {
            var role = roleBinding.get();

            if (role == null)
                return null;

            return role.getReadableName();
        }, roleBinding);

        this.roleLabel.textProperty().bind(readableRoleBinding);
        this.nameLabel.textProperty().bind(nameSurname);

        this.timeLabel.textProperty().bind(this.timeProperty);
        this.dateLabel.textProperty().bind(this.dateProperty);

        var df = DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG);
        var tf = DateTimeFormatter.ofLocalizedTime(FormatStyle.MEDIUM);

        EventHandler<ActionEvent> updateHandler = event -> {
            var dt = ZonedDateTime.now();
            AppBaseController.this.timeProperty.set(dt.format(tf));
            AppBaseController.this.dateProperty.set(dt.format(df));
        };

        updateHandler.handle(null);

        this.timeUpdater = new Timeline(new KeyFrame(Duration.seconds(1), updateHandler));
        this.timeUpdater.setCycleCount(Animation.INDEFINITE);
        this.timeUpdater.play();

        this.switchView("view/HomeView");
    }

    public void switchView(String viewName) throws IOException
    {
        var paneLoader = AppMain.createFXMLLoader(viewName);
        AnchorPane currentView = paneLoader.load();
        ViewController controller = paneLoader.getController();
        controller.setViewSwitcher(this::switchView);
        controller.setLoginData(this.loginData);
        controller.setTimeData(this.timeProperty, this.dateProperty);
        this.viewPane.setContent(currentView);
    }

    @FXML
    public void homeClick(MouseEvent event) throws IOException
    {
        this.switchView("view/HomeView");
    }

    @FXML
    public void healthStateClick(MouseEvent event) throws IOException
    {
        this.switchView("view/PatientInfoSelfView");
    }

    @FXML
    public void logoutClick(ActionEvent event) throws IOException
    {
        this.timeUpdater.stop();

        var scene = this.container.getScene();
        AnchorPane loginScreen = AppMain.loadFXML("LoginScreen");
        scene.setRoot(loginScreen);
    }

    public void setLoginData(LoginData loginData)
    {
        this.loginData.setValue(loginData);
    }
}

