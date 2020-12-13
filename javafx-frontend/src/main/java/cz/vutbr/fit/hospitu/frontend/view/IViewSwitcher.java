package cz.vutbr.fit.hospitu.frontend.view;

import java.io.IOException;

@FunctionalInterface
public interface IViewSwitcher
{
    void switchView(String viewName) throws IOException;
}
