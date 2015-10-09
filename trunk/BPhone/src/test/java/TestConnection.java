import com.phone.connection.EPHttpGet;


public class TestConnection {

	public static void main(String[] args) {
		EPHttpGet get = new EPHttpGet("http://www.vmall.com", null);
		get.connection();
	}
	
}
