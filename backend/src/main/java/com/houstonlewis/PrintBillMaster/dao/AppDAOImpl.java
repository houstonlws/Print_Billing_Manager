package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.PriceProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class AppDAOImpl implements AppDAO {

    private final RowMapper<PriceProfile> mapper = (rs, rowNum) -> new PriceProfile(
            getString(rs, "id"),
            getString(rs, "name"),
            getString(rs, "bw_price"),
            getString(rs, "color_price"),
            getString(rs, "paper_price"),
            getString(rs, "is_active")
    );

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public PriceProfile getPriceProfile() {
        try {
            String query = "SELECT * FROM prices WHERE is_active=TRUE";
            PriceProfile profile = jdbcTemplate.queryForObject(query, mapper);
            return profile;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean setPriceProfile(String id) {
        try {
            String stmt = "UPDATE prices SET is_active=IF(id != ?, 0 ,1);";
            int updated = jdbcTemplate.update(stmt, id);
            return updated != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean addPriceProfile(PriceProfile profile) {
        System.out.println(profile);
        String stmt = "INSERT INTO prices (name, bw_price, color_price, paper_price) VALUES (?,?,?,?)";
        int inserted = jdbcTemplate.update(stmt, profile.getName(), profile.getBw_price(), profile.getColor_price(), profile.getPaper_price());
        return inserted != 0;
    }

    @Override
    public boolean updatePriceProfile(PriceProfile profile) {
        String stmt = "UPDATE prices SET name=?, bw_price=?, color_price=? , paper_price=? WHERE id=?";
        int updated = jdbcTemplate.update(stmt, profile.getName(), profile.getBw_price(), profile.getColor_price(), profile.getPaper_price(), profile.getId());
        return updated != 0;
    }
}
