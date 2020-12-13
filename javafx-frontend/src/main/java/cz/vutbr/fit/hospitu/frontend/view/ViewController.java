package cz.vutbr.fit.hospitu.frontend.view;

import cz.vutbr.fit.hospitu.frontend.data.LoginData;
import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

import java.io.IOException;

public abstract class ViewController
{
    private IViewSwitcher viewSwitcher;
    protected SimpleObjectProperty<LoginData> loginData;

    protected StringProperty date;
    protected StringProperty time;

    public ViewController()
    {
        this.loginData = new SimpleObjectProperty<>();

        this.date = new SimpleStringProperty();
        this.time = new SimpleStringProperty();
    }

    public void setViewSwitcher(IViewSwitcher viewSwitcher)
    {
        this.viewSwitcher = viewSwitcher;
    }

    public void setLoginData(ObjectProperty<LoginData> loginData)
    {
        this.loginData.bindBidirectional(loginData);
    }

    public void setTimeData(StringProperty time, StringProperty date)
    {
        this.time.bind(time);
        this.date.bind(date);
    }

    protected void switchView(String view) throws IOException
    {
        this.viewSwitcher.switchView(view);
    }
}
