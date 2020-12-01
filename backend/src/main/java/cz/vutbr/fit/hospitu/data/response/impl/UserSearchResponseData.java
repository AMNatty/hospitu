package cz.vutbr.fit.hospitu.data.response.impl;

import cz.vutbr.fit.hospitu.data.response.AbstractResponseData;
import org.jetbrains.annotations.NotNull;

import java.util.List;

public class UserSearchResponseData extends AbstractResponseData
{
    @NotNull
    private final List<UserSearchResult> searchResults;

    public UserSearchResponseData(@NotNull List<UserSearchResult> searchResults)
    {
        super(200);
        this.searchResults = searchResults;
    }

    public @NotNull List<UserSearchResult> getSearchResults()
    {
        return this.searchResults;
    }
}
