package cz.vutbr.fit.hospitu.access;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.OptionalInt;
import java.util.concurrent.atomic.AtomicLong;

public class AuthorizationManager
{
    private AtomicLong instanceCounter;
    private SecureRandom secureRandom;

    private final Map<String, Integer> authorizedUsers = new HashMap<>();

    private static AuthorizationManager instance;

    public static AuthorizationManager instance()
    {
        if (instance == null)
        {
            instance = new AuthorizationManager();
            instance.instanceCounter = new AtomicLong();
            instance.secureRandom = new SecureRandom();
        }

        return instance;
    }

    public synchronized String authorize(int userID)
    {
        final int arbitraryRandomBytes = 24;
        var byteBuf = ByteBuffer.allocate(Long.BYTES + Long.BYTES + arbitraryRandomBytes);
        byteBuf.putLong(instanceCounter.getAndIncrement());
        byteBuf.putLong(System.currentTimeMillis());
        byte[] randomBytes = new byte[arbitraryRandomBytes];
        secureRandom.nextBytes(randomBytes);
        byteBuf.put(randomBytes);
        byteBuf.flip();
        var base64Encoder = Base64.getEncoder();
        var base64Buf = base64Encoder.encode(byteBuf);
        var token = StandardCharsets.UTF_8.decode(base64Buf).toString();
        authorizedUsers.put(token, userID);
        return token;
    }

    public synchronized String randomBase64(int length)
    {
        assert length % 4 == 0;

        final int bytes = length * 3 / 4;
        byte[] randomBytes = new byte[bytes];
        secureRandom.nextBytes(randomBytes);

        var base64Encoder = Base64.getEncoder();
        var base64Buf = base64Encoder.encode(randomBytes);
        return new String(base64Buf, StandardCharsets.UTF_8);
    }

    public synchronized OptionalInt getUser(String token)
    {
        var user = authorizedUsers.get(token);
        return user == null ? OptionalInt.empty() : OptionalInt.of(user);
    }

    public synchronized OptionalInt removeAuthorization(String token)
    {
        var user = authorizedUsers.remove(token);
        return user == null ? OptionalInt.empty() : OptionalInt.of(user);
    }
}
