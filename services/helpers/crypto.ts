import * as crypto from 'crypto';

export const encrypt = (plaintext:string, key:string=process.env.NUXT_CRYPTO_KEY!) => {
    // IV is being generated for each encryption
    let iv = crypto.randomBytes(12),
    cipher = crypto.createCipheriv('aes-256-gcm',key,iv),
    encryptedData = cipher.update(plaintext, 'utf-8', 'hex'),
    tag;

    // Cipher.final has been called, so no more encryption/updates can take place
    encryptedData += cipher.final('hex');

    // Auth tag must be generated after cipher.final()
    tag = cipher.getAuthTag();

    return encryptedData + "$$" + tag.toString('hex') + "$$" + iv.toString('hex');
}

export const decrypt = (ciphertext:string, key:string=process.env.NUXT_CRYPTO_KEY!) => {
    let cipherSplit = ciphertext.split("$$"),
    text = cipherSplit[0],
    tag = Buffer.from(cipherSplit[1], 'hex'),
    iv = Buffer.from(cipherSplit[2], 'hex'),
    decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);


    decipher.setAuthTag(tag);

    let decryptedData = decipher.update(text, 'hex', 'utf-8');

    decryptedData += decipher.final('utf-8');
    return decryptedData
}

export const sash = (password:string) => {
    if(!process.env.NUXT_SASH_KEY)
      throw new Error("Unable to Access SALT HASH KEY")
    return crypto.createHmac('sha512',process.env.NUXT_SASH_KEY!).update(password).digest('hex');
  }