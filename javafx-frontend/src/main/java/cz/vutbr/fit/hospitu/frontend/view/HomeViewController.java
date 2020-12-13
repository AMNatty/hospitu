package cz.vutbr.fit.hospitu.frontend.view;

import javafx.fxml.FXML;
import javafx.scene.control.Label;


public class HomeViewController extends ViewController
{
    @FXML
    private Label currentDateLabel;

    @FXML
    public void initialize()
    {
        this.currentDateLabel.textProperty().bind(this.date);
    }
}
