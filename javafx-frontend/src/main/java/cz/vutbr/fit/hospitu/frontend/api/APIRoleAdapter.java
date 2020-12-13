package cz.vutbr.fit.hospitu.frontend.api;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;

public class APIRoleAdapter extends TypeAdapter<EnumAPIRole>
{
    @Override
    public void write(JsonWriter out, EnumAPIRole value) throws IOException
    {
        out.value(value.getDBName());
    }

    @Override
    public EnumAPIRole read(JsonReader in) throws IOException
    {
        return EnumAPIRole.getByDBName(in.nextString());
    }
}
