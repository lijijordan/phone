package com.phone.connection;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.ProtocolException;
import org.apache.http.client.RedirectStrategy;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.protocol.HttpContext;

public class ConnectionFactory {

	/*private static CloseableHttpClient httpclient;
	
	static{
		SSLContextBuilder builder = new SSLContextBuilder();
		try {
			builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(
					builder.build());
			ConnectionSocketFactory plainsf = new PlainConnectionSocketFactory();
			Registry<ConnectionSocketFactory> r = RegistryBuilder
					.<ConnectionSocketFactory> create().register("http", plainsf)
					.register("https", sslsf).build();
			PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(r);
			HttpHost proxy = new HttpHost("127.0.0.1", 8087);
			HttpClientBuilder httpClientBuilder = HttpClients.custom();
			cm.setMaxTotal(10);
			httpClientBuilder.setProxy(proxy);
			// ���ӳ�
//			httpClientBuilder.setConnectionManager(cm);
			httpClientBuilder.setSSLSocketFactory(sslsf);
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
		}
		
		
		
	}*/

	/**
	 * @param rediret true： auto redirect
	 * @return
	 */
	public static CloseableHttpClient getHttpClientNInstance(boolean rediret) {
		CloseableHttpClient httpclient = null;
		SSLContextBuilder builder = new SSLContextBuilder();
		try {
			builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(
					builder.build());
			ConnectionSocketFactory plainsf = new PlainConnectionSocketFactory();
			RegistryBuilder
					.<ConnectionSocketFactory> create().register("http", plainsf)
					.register("https", sslsf).build();
			HttpClientBuilder httpClientBuilder = HttpClients.custom();
			HttpHost proxy = new HttpHost("127.0.0.1", 8087);
//			HttpHost proxy = new HttpHost("ctu2-tmg-00.vancloa.cn", 8080);
			httpClientBuilder.setProxy(proxy);
			// set Follow Redirects strategy
			if(!rediret){
				httpClientBuilder.setRedirectStrategy(new RedirectStrategy() {
					public boolean isRedirected(HttpRequest arg0, HttpResponse arg1,
							HttpContext arg2) throws ProtocolException {
						return false;
					}
					public HttpUriRequest getRedirect(HttpRequest arg0, HttpResponse arg1,
							HttpContext arg2) throws ProtocolException {
						return null;
					}
				});
			}
			httpClientBuilder.setSSLSocketFactory(sslsf);
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
		}
		return httpclient;
	}
	
	
	/*public static CloseableHttpClient getHttpClientAInstance() {
		return httpclient;
	}
	*/

}
