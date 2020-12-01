package cz.vutbr.fit.hospitu.data.response.impl;

import cz.vutbr.fit.hospitu.data.response.AbstractResponseData;
import org.jetbrains.annotations.NotNull;

import java.util.List;

public class UserSearchResponseData extends AbstractResponseData
{
    @NotNull
    private final List<? extends UserSearchResult> searchResults;

    public UserSearchResponseData(@NotNull List<? extends UserSearchResult> searchResults)
    {
        super(200);
        this.searchResults = searchResults;
    }

    public @NotNull List<? extends UserSearchResult> getSearchResults()
    {
        return this.searchResults;
    }
}
