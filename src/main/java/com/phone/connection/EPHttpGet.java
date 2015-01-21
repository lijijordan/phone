package com.phone.connection;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.phone.bean.User;

public class EPHttpGet {

	private static final Logger log = Logger.getLogger(EPHttpGet.class);
	private ConnectionCallBack callback;
	private HttpGet httpGet;
	private HttpClientContext context;
	private CloseableHttpClient client ;
	private boolean isReConnection = true;
	
	public EPHttpGet(String url, ConnectionCallBack callback, User user, Map<String, String> headMap) {
		log.info("HTTP Get URL : " + url);
		this.callback = callback;
		this.httpGet = new HttpGet(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(ConnectionConstant.SOCKET_TIMEOUT).
				setConnectTimeout(ConnectionConstant.CONNECT_TIMEOUT).build();
		httpGet.setConfig(requestConfig);
		Set<String> set = headMap.keySet();
		for (String key : set) {
			httpGet.setHeader(key, headMap.get(key));
		}
		if(user != null){
			this.context = user.getContext();
			this.client = user.getClient();
		}else{
			this.context = HttpClientContext.create();
			this.client = (ConnectionFactory.getHttpClientNInstance(false));
		}
		// debug
		if(this.context != null && this.context.getCookieStore() != null){
			List<Cookie> list = this.context.getCookieStore().getCookies();
			for (Cookie cookie : list) {
				log.info("Request Cookie:");
				log.info("name=" + cookie.getName() + ",value=" + cookie.getValue() + ",domain=" + cookie.getDomain());
			}
		}
	}
	
	public EPHttpGet(String url, ConnectionCallBack callback, User user) {
		log.info("HTTP Get URL : " + url);
		this.callback = callback;
		this.httpGet = new HttpGet(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(ConnectionConstant.SOCKET_TIMEOUT).
				setConnectTimeout(ConnectionConstant.CONNECT_TIMEOUT).build();
		httpGet.setConfig(requestConfig);
		httpGet.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		httpGet.setHeader("Accept-Encoding", "gzip, deflate, sdch");
		httpGet.setHeader("Accept-Language", "en,zh;q=0.8,ja;q=0.6,zh-CN;q=0.4,ko;q=0.2,zh-TW;q=0.2");
		httpGet.setHeader("Cache-Control", "no-cache");
		httpGet.setHeader("Connection", "keep-alive");
		httpGet.setHeader("Cookie", "_uticket=q9AhmBbmnkyBgdFaeEkL3IUiEvoiee1TUMwmJqIoEI55nCQJbbBFzLR5R1B8S8HWfmb7lbdPX0oYbgG2Ga46BkK3lpt8XOf_OtFDCbKLqy-_KxpWIJ1ZG5q2WSMNBXXUY9ZXRSfS6GJfdwxdisdNhvn_7tKN69a6UmZPyn4dknY*eGJgpKMDW9BA49V9h-AQyA; _gat=1; MEIZUSESSIONID=37084277905335519DB607DF10DA9DDB9EB2131879CBA6C; MEIZUSESSIONVAL=%7B%22uid%22%3A%2210850048%22%2C%22username%22%3A%22%5Cu7528%5Cu623743400192%22%7D; Hm_lvt_2a0c04774115b182994cfcacf4c122e9=1416555152,1416556713,1416556965,1416556981; Hm_lpvt_2a0c04774115b182994cfcacf4c122e9=1416557142; _ga=GA1.2.109721507.1416556398");
		httpGet.setHeader("Host", "store.meizu.com");
		httpGet.setHeader("Pragma", "no-cache");
		httpGet.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36");
		this.context = user.getContext();
		this.client = user.getClient();
/*		if(this.context != null && this.context.getCookieStore() != null){
			CookieStore cs = context.getCookieStore();
			System.out.println(cs.getCookies().size());
		}
*/	
	}
	
	
	public int connection(){
		CloseableHttpResponse response = null;
		int statusCode = 0;
		try {
			response = this.client.execute(httpGet, context);
			if(response != null && response.getStatusLine() != null){
				statusCode = response.getStatusLine().getStatusCode();
			}
			System.out.println("states code : " + response.getStatusLine().getStatusCode());
			if(response.getEntity() != null){
				HttpEntity entity = response.getEntity();
				String entityBody = null;
				try {
					byte[] bytes = EntityUtils.toByteArray(entity);
					entityBody = new String(bytes, Consts.UTF_8); // utf-8
					// entityBody = EntityUtils.toString(entity,
					// this.charset);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				System.out.println("Response Body : " + entityBody);
				callback.callback(entityBody);
			}
			callback.callback(response);
//				log.info("http get return : " + sb.toString());
//			System.out.println("Parse String Cost Time: " + (System.currentTimeMillis() - start1));
		} catch (ClientProtocolException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(response != null)
					response.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// recall
			if(isReConnection && !(statusCode == 200 || statusCode == 302)){
				this.connection();
			}
		}
		return statusCode;
	}
	
	
	public int loadImage(String file){
		CloseableHttpResponse response = null;
		int statusCode = 0;
		FileOutputStream out = null;
		try {
			response = this.client.execute(httpGet, context);
			if(response != null && response.getStatusLine() != null){
				statusCode = response.getStatusLine().getStatusCode();
			}
			System.out.println("states code : "
					+ response.getStatusLine().getStatusCode());
			InputStream fis = response.getEntity()
					.getContent();
			out = new FileOutputStream(file);

			byte[] buffer = new byte[1024];
			long count = 0L;
			int n = 0;
			while (-1 != (n = fis.read(buffer))) {
				out.write(buffer, 0, n);
				count += n;
			}
			System.out.println("read file size : " + count);
		} catch (ClientProtocolException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(response != null)
					response.close();
				if(out != null){
					out.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// recall
			if(isReConnection && !(statusCode == 200 || statusCode == 302)){
				this.connection();
			}
		}
		return statusCode;
	}

	public boolean isReConnection() {
		return isReConnection;
	}

	public void setReConnection(boolean isReConnection) {
		this.isReConnection = isReConnection;
	}
	
}
