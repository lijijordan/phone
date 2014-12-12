package com.phone.connection;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

import org.apache.http.HttpHost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;

public class ConnectionFactoryOld {

	private static CloseableHttpClient httpclient;
	
	static{
		SSLContextBuilder builder = new SSLContextBuilder();
		try {
			/**
			 * ʹ��֤�� start
			 */
			SSLConnectionSocketFactory sslsf = null;

			CertificateFactory cf = CertificateFactory.getInstance("X.509");
			InputStream caInput = ConnectionFactoryOld.class.getClassLoader().getResourceAsStream("finnciti.cer");
			Certificate ca = null;
			try {
				ca = cf.generateCertificate(caInput);
				System.out.println("Generate Cert ificate ca=" + ((X509Certificate)ca).getSubjectDN());
			} catch (Exception e) {
				e.printStackTrace();
			}finally {
				caInput.close();
			}

			//���캬������CA֤���KeyStore
			KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
			trustStore.load(null, null);
			trustStore.setCertificateEntry("ca", ca);
			
			// SSLContext
			SSLContextBuilder sslContextbuilder = new SSLContextBuilder();
			sslContextbuilder.useTLS();
			sslContextbuilder.loadTrustMaterial(trustStore);
			sslsf = new SSLConnectionSocketFactory(sslContextbuilder.build(), SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
		
			/**
			 * end
			 */
			
			builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
			ConnectionSocketFactory plainsf = new PlainConnectionSocketFactory();
			Registry<ConnectionSocketFactory> r = RegistryBuilder
					.<ConnectionSocketFactory> create().register("http", plainsf)
					.register("https", sslsf).build();
			PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(r);
			// ��������������ӵ�200
		    cm.setMaxTotal(200);
		    // ��ÿ��·�ɻ���������ӵ�20
		    cm.setDefaultMaxPerRoute(20);
		    //��Ŀ�������������������ӵ�50
		    HttpHost localhost = new HttpHost("www.finnciti.com", 80);
		    cm.setMaxPerRoute(new HttpRoute(localhost), 50);
			HttpClientBuilder httpClientBuilder = HttpClients.custom();
			/**
			 * ���ô��� start
			 */
			/*HttpHost proxy = new HttpHost("127.0.0.1", 8087);
			DefaultProxyRoutePlanner routePlanner = new DefaultProxyRoutePlanner(proxy);
			httpClientBuilder.setRoutePlanner(routePlanner);*/
			/**
			 * end
			 */
			httpClientBuilder.setConnectionManager(cm);
			httpclient = httpClientBuilder.build();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (KeyStoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (KeyManagementException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (CertificateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

	public static CloseableHttpClient getHttpClient() {
		return httpclient;
	}

}
